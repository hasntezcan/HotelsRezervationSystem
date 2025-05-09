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

            // Kullanıcı mesajını HTML içinde güvenli kullanmak için escape ediyoruz
            String userMsgHtml = (message != null && !message.isBlank())
                ? "<p><strong>Mesajınız:</strong> " + HtmlUtils.htmlEscape(message) + "</p>"
                : "";

            String body = String.format(
                "<p>Merhaba <strong>%s %s</strong>,</p>" +
                "%s" +
                "<p>Bizi tercih ettiğiniz için teşekkür ederiz. Rezervasyon bilgileriniz faturanızın içindedir. Faturanız ektedir.</p>" +
                "<p>Sevgilerle,<br/>Stayinn</p>",
                HtmlUtils.htmlEscape(firstName),
                HtmlUtils.htmlEscape(lastName),
                userMsgHtml
            );

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
