package com.sieum.music.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReverseGeoResponse {

    String region3Depth;

    public static ReverseGeoResponse of(
            final KakaoMapReverseGeoResponse kakaoMapReverseGeoResponse) {
        return builder()
                .region3Depth(kakaoMapReverseGeoResponse.getDocuments().get(0).region_3depth_name)
                .build();
    }
}
