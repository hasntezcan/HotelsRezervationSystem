package com.example.hotelapp.controller;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:5173")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Fatura e-postası gönderir. Multipart/form-data ile email, isim, mesaj ve PDF bekler.
     */
    @PostMapping(
    path = "/send-invoice",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<String> sendInvoice(
        @RequestPart("email") String toEmail,
        @RequestPart("firstName") String firstName,
        @RequestPart("lastName") String lastName,
        @RequestPart(value = "message", required = false) String message,
        @RequestPart("file") MultipartFile file
) {
    try {
        MimeMessage mime = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Rezervasyon Faturası");

        // Güvenlik için kullanıcı girdilerini escape ediyoruz
        String safeFirst = HtmlUtils.htmlEscape(firstName);
        String safeLast  = HtmlUtils.htmlEscape(lastName);
        String userMsgHtml = (message != null && !message.isBlank())
            ? "<p><strong>Mesajınız:</strong> " + HtmlUtils.htmlEscape(message) + "</p>"
            : "";

        // Inline-CSS içeren HTML gövde
        String body = """
            <html>
            <head>
              <style>
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  border: 1px solid #e0e0e0;
                  border-radius: 8px;
                }
                h1 {
                  color: #333333;
                  font-size: 22px;
                  text-align: center;
                }
                p {
                  color: #555555;
                  line-height: 1.5;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: #999999;
                  text-align: center;
                }
                .button {
                  display: inline-block;
                  margin: 20px 0;
                  padding: 10px 16px;
                  font-size: 14px;
                  color: #ffffff !important;
                  background-color: #28a745;
                  text-decoration: none;
                  border-radius: 4px;
                }
                .button:hover {
                  background-color: #218838;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Rezervasyon Faturası</h1>
                <p>Merhaba <strong>%s %s</strong>,</p>
                %s
                <p>Rezervasyon detaylarınızı içeren faturanız ektedir.</p>
                <p>Faturayı inceleyip, herhangi bir sorunuz olursa lütfen bizimle iletişime geçin.</p>
                <div class="footer">
                  Bu e-postayı siz talep etmediyseniz lütfen bizimle iletişime geçin.
                </div>
              </div>
            </body>
            </html>
            """.formatted(safeFirst, safeLast, userMsgHtml);

        helper.setText(body, true);
        helper.addAttachment("invoice.pdf", file);
        mailSender.send(mime);

        return ResponseEntity.ok("Email sent");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error sending email");
    }
}

}
