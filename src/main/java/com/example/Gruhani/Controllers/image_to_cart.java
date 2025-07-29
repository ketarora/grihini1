package com.example.Gruhani.Controllers;


import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class image_to_cart {

    @PostMapping("/upload")
    public void methew(@RequestParam("file") MultipartFile file) throws IOException {
        ImageAnnotatorClient vision = ImageAnnotatorClient.create();
        // System.out.print("googlr"+);
        System.out.println("file"+file);

        ByteString imgBytes = ByteString.copyFrom(file.getBytes());

        Image image = Image.newBuilder().setContent(imgBytes).build();
        Feature feature = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();

        AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                .setImage(image)
                .addFeatures(feature)
                .build();

        BatchAnnotateImagesResponse response = vision.batchAnnotateImages(List.of(request));
        AnnotateImageResponse res = response.getResponses(0);

        String extractedText = res.getFullTextAnnotation().getText();
        System.out.println(extractedText);



    }
}
