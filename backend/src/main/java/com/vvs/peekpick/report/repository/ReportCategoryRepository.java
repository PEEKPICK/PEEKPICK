package com.vvs.peekpick.report.repository;

import com.vvs.peekpick.entity.ReportCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportCategoryRepository extends JpaRepository<ReportCategory, Long> {
    Optional<ReportCategory> findByReportCategoryId(Long reportCategoryId);

}
