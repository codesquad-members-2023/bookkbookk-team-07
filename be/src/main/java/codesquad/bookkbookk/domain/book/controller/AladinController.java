package codesquad.bookkbookk.domain.book.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.bookkbookk.domain.book.data.dto.ReadAladinBooksResponse;
import codesquad.bookkbookk.domain.book.service.AladinService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/aladin")
public class AladinController {

    private final AladinService aladinService;

    @GetMapping("/books")
    public ResponseEntity<List<ReadAladinBooksResponse>> readBooks(@RequestParam String search) {
        List<ReadAladinBooksResponse> responses = aladinService.readAladinBooks(search);

        return ResponseEntity.ok()
                .body(responses);
    }

}
