package com.sieum.music.service;

import static com.sieum.music.exception.CustomExceptionStatus.*;

import com.sieum.music.controller.feign.TokenAuthClient;
import com.sieum.music.domain.*;
import com.sieum.music.dto.response.ThrownMusicDetailResponse;
import com.sieum.music.exception.BadRequestException;
import com.sieum.music.repository.MusicRepository;
import com.sieum.music.repository.PlaylistHistoryRepository;
import com.sieum.music.repository.PlaylistRepository;
import com.sieum.music.repository.ThrowHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final TokenAuthClient tokenAuthClient;
    private final MusicRepository musicRepository;
    private final ThrowHistoryRepository throwHistoryRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistHistoryRepository playlistHistoryRepository;

    public int getCurrentUserId(String authorization) {
        return 1;
//        return tokenAuthClient.getUserId(authorization);
    }

    public ThrownMusicDetailResponse getDetailOfThrownMusic(final long throwId) {
        final ThrowItem throwItem =
                musicRepository
                        .findById(throwId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_THROW_ITEM_ID));
        return ThrownMusicDetailResponse.of(throwItem);
    }

    @Transactional
    public void createPickup(final int userId, final long throwId) {
        final ThrowItem throwItem =
                musicRepository
                        .findById(throwId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_THROW_ITEM_ID));
        createThrowHistory(userId, throwItem);
//        Playlist playlist=createPlaylist(userId,throwItem.getSong());
//        createPlaylistHistory(playlist);
        findPlaylist(userId,throwItem.getSong(), true).orElseGet(
                ()->{
                    createPlaylistHistory(createPlaylist(userId,throwItem.getSong()));
                }
        );
    }

    private void createThrowHistory(final int userId, final ThrowItem throwItem) {
        throwHistoryRepository.save(
                ThrowHistory.builder()
                        .userId(userId)
                        .throwItem(throwItem)
                        .build()
        );
    }

    private Playlist createPlaylist(final int userId, final Song song) {

        return playlistRepository.save(
                Playlist.builder()
                        .userId(userId)
                        .song(song)
                        .status(true)
                        .build());

    }

    private void createPlaylistHistory(Playlist playlist) {
        playlistHistoryRepository.save(
                PlaylistHistory.builder()
                        .playlist(playlist)
                        .status(true)
                .build()
        );
    }

    private Optional<Playlist> findPlaylist(final int userId, final Song song, final boolean status) {
        playlistRepository.findByUserIdAndSongIdAndStatus(userId,song.getId(),status);
    }

}
