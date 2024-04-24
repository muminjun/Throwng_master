package com.sieum.music.repository;


import com.sieum.music.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    Optional<Playlist> findByUserIdAndSongIdAndStatus(final int userId, final int songId, final boolean status);
}
