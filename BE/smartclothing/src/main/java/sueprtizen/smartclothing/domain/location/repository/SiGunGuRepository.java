package sueprtizen.smartclothing.domain.location.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.location.entity.SiDo;

@Repository
public interface SiGunGuRepository extends JpaRepository<SiDo, Integer> {
}
