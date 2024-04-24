package com.sieum.music.controller;

import com.sieum.music.service.MusicService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @Operation(summary = "show detail of a thrown music")
    @GetMapping("/thrown/{throwId}")
    public ResponseEntity<?> getDetailOfThrownMusic(@PathVariable long throwId) {
        return ResponseEntity.ok().body(musicService.getDetailOfThrownMusic(throwId));
    }

    @Operation(summary = "pick up a song")
    @PostMapping("/pick/{throwId}")
    public ResponseEntity<?> createPickup(@RequestHeader("Authorization") String authorization, @PathVariable long throwId) {
        int userId = musicService.getCurrentUserId(authorization);
        musicService.createPickup(userId, throwId);
        return ResponseEntity.noContent().build();
    }
}
