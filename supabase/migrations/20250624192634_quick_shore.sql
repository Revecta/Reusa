/*
  # Email Templates Configuration

  1. Email Templates Setup
    - Configure custom email templates for Supabase Auth
    - Set up welcome email and password reset templates
    - Add Italian language support

  2. Email Configuration
    - Custom email templates with Reusa branding
    - Responsive design matching website aesthetics
    - Proper localization for Italian users
*/

-- Note: This migration file documents the email template configuration
-- The actual email templates need to be configured in the Supabase Dashboard
-- under Authentication > Email Templates

-- Email template configuration should include:
-- 1. Confirm signup template (Welcome email)
-- 2. Reset password template
-- 3. Magic link template (if used)
-- 4. Email change confirmation template

-- The templates use the custom HTML from emailTemplates.ts
-- and should be configured with the following settings:

-- SMTP Configuration (to be set in Supabase Dashboard):
-- - SMTP Host: smtp.gmail.com
-- - SMTP Port: 587
-- - SMTP User: your_email@gmail.com
-- - SMTP Password: your_app_password
-- - Sender Name: Reusa
-- - Sender Email: noreply@reusa.eu

-- Email Template Variables available:
-- {{ .Email }} - User's email address
-- {{ .Token }} - Verification token
-- {{ .TokenHash }} - Token hash
-- {{ .SiteURL }} - Site URL (https://reusa.eu)
-- {{ .ConfirmationURL }} - Full confirmation URL
-- {{ .RedirectTo }} - Redirect URL after confirmation

-- Custom email templates should be uploaded to Supabase Dashboard
-- using the HTML content from the emailTemplates.ts file