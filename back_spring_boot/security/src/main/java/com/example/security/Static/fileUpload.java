package com.example.security.Static;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class fileUpload {
    public static void saveImage(String dir, MultipartFile file) {
//        convert the given uri to Path object
        String absolutePath = Paths.get("abc/").toAbsolutePath().toFile().getAbsolutePath();
        String subString = absolutePath.substring(0, absolutePath.lastIndexOf("/"));
        String subString2 = subString.substring(0, subString.lastIndexOf("/")) + dir;
        Path path = Paths.get(subString2);

//        create the file if not exists
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                System.out.println("first error msg when we save the image is " + e.getMessage());
            }
        }
        File f = new File(subString2);
        try(InputStream input = file.getInputStream()) {
            Files.copy(input, f.toPath().resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("and finally we teminate this hard part");
        } catch (IOException e) {
            System.out.println("the second message when we save the image is " + e.getMessage());
        }
    }

    public static void delete(String dir) {
        String absolutePath = Paths.get("abc/").toAbsolutePath().toFile().getAbsolutePath();
        String subString = absolutePath.substring(0, absolutePath.lastIndexOf("/"));
        String subString2 = subString.substring(0, subString.lastIndexOf("/")) + dir;
        Path p = Paths.get(subString2);
        if (Files.exists(p)) {
            try {
                Files.list(p).forEach(file -> {
                    try {
                        Files.delete(file);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
