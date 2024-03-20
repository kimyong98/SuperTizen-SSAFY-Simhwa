package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Entity
public class ClothingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private int clothingDetailId;

    @Column(nullable = false)
    private String clothingImgPath;

    @Column(nullable = false)
    private String color;

    @OneToMany(mappedBy = "clothingDetail")
    @Column(nullable = false)
    private Set<ClothingTexture> clothingTextures = new HashSet<>();

}