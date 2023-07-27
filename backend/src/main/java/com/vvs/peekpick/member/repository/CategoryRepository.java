package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT DISTINCT large FROM category;", nativeQuery = true)
    List<Category> findLarge();
}
