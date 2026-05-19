<?php
/**
 * Immigration Contact Form Handler
 * Sends submissions from the immigration page contact form via Mailgun API.
 * Mirrors the pattern in send-mail.php and reuses api/config.php.
 */

require_once __DIR__ . '/api/config.php';

function debugLog($message) {
    $logFile = __DIR__ . '/api/debug.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] [send-immigration-mail] $message\n", FILE_APPEND);
}

debugLog("=== Immigration mail endpoint called ===");

$mailgun_api_key  = MAILGUN_API_KEY;
$mailgun_endpoint = MAILGUN_ENDPOINT;
$to_email         = TEAM_EMAIL;
$from_email       = FROM_EMAIL;
$subject_prefix   = '[Immigration Page] ';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_mailgun_email($api_key, $endpoint, $from, $to, $subject, $html_body, $reply_to = null) {
    debugLog("Sending email to: $to");
    debugLog("Subject: $subject");

    $post_data = [
        'from'    => $from,
        'to'      => $to,
        'subject' => $subject,
        'html'    => $html_body,
    ];

    if ($reply_to) {
        $post_data['h:Reply-To'] = $reply_to;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
    curl_setopt($ch, CURLOPT_USERPWD, 'api:' . $api_key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $response  = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    debugLog("Mailgun HTTP Code: $http_code");
    debugLog("Mailgun Response: $response");
    debugLog("Mailgun cURL Error: " . ($curl_error ?: 'none'));

    return [
        'success'   => ($http_code >= 200 && $http_code < 300),
        'http_code' => $http_code,
        'response'  => $response,
        'error'     => $curl_error,
    ];
}

// Collect & sanitize
$fullName     = isset($_POST['fullName'])     ? sanitize_input($_POST['fullName'])     : '';
$email        = isset($_POST['email'])        ? sanitize_input($_POST['email'])        : '';
$firmName     = isset($_POST['firmName'])     ? sanitize_input($_POST['firmName'])     : '';
$firmSize     = isset($_POST['firmSize'])     ? sanitize_input($_POST['firmSize'])     : '';
$practiceArea = isset($_POST['practiceArea']) ? sanitize_input($_POST['practiceArea']) : '';
$platform     = isset($_POST['platform'])     ? sanitize_input($_POST['platform'])     : '';
$painPoint    = isset($_POST['painPoint'])    ? sanitize_input($_POST['painPoint'])    : '';

$errors = [];
if (empty($fullName))                       $errors[] = 'Name is required';
if (empty($email))                          $errors[] = 'Email is required';
elseif (!is_valid_email($email))            $errors[] = 'Please enter a valid email address';
if (empty($firmName))                       $errors[] = 'Firm name is required';
if (empty($firmSize))                       $errors[] = 'Number of attorneys is required';
if (empty($practiceArea))                   $errors[] = 'Practice area is required';
if (empty($platform))                       $errors[] = 'Current platform is required';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Pretty labels for selects
$firm_size_names = [
    'solo'  => 'Solo (1 attorney)',
    '1-5'   => 'Small (1-5 attorneys)',
    '5-25'  => 'Mid-size (5-25 attorneys)',
    '25-50' => 'Large (25-50 attorneys)',
];
$practice_area_names = [
    'immigration'     => 'Immigration',
    'personal-injury' => 'Personal Injury',
    'family'          => 'Family Law',
    'corporate'       => 'Corporate',
    'other'           => 'Other',
];

$firm_size_display     = isset($firm_size_names[$firmSize])         ? $firm_size_names[$firmSize]         : $firmSize;
$practice_area_display = isset($practice_area_names[$practiceArea]) ? $practice_area_names[$practiceArea] : $practiceArea;
$pain_point_display    = $painPoint !== '' ? nl2br($painPoint) : '<em>Not provided</em>';

$email_subject = $subject_prefix . 'New audit inquiry from ' . $fullName;

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0a0a0a; color: #fff; padding: 32px 30px; text-align: center; }
        .header img { display: block; margin: 0 auto 16px; height: 40px; width: auto; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 500; }
        .content { background: #f9f9f9; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { margin-top: 5px; font-size: 16px; }
        .message-box { background: #fff; border-left: 4px solid #f06730; padding: 15px; margin-top: 10px; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://taha-farooqui.github.io/AV-immigration/assets/images/logo-white.png' alt='AlphaVenture' height='40' />
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name</div>
                <div class='value'>{$fullName}</div>
            </div>
            <div class='field'>
                <div class='label'>Email</div>
                <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
            </div>
            <div class='field'>
                <div class='label'>Firm Name</div>
                <div class='value'>{$firmName}</div>
            </div>
            <div class='field'>
                <div class='label'>Number of Attorneys</div>
                <div class='value'>{$firm_size_display}</div>
            </div>
            <div class='field'>
                <div class='label'>Practice Area</div>
                <div class='value'>{$practice_area_display}</div>
            </div>
            <div class='field'>
                <div class='label'>Current Platform</div>
                <div class='value'>{$platform}</div>
            </div>
            <div class='field'>
                <div class='label'>Biggest Pain Point</div>
                <div class='message-box'>{$pain_point_display}</div>
            </div>
        </div>
        <div class='footer'>
            Sent from the immigration landing page contact form.
        </div>
    </div>
</body>
</html>
";

$result = send_mailgun_email(
    $mailgun_api_key,
    $mailgun_endpoint,
    $from_email,
    $to_email,
    $email_subject,
    $email_body,
    $email
);

if ($result['success']) {
    echo json_encode([
        'success' => true,
        'message' => 'Thanks - we\'ll be in touch shortly to start the conversation.',
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or email us directly.',
    ]);
}
