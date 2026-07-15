package com.coditas.auth_service.entity;

import com.coditas.auth_service.enums.Department;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;
    @Column(name = "requirements")
    private Integer requirements;
    @Enumerated(EnumType.STRING)
    @Column(name = "department")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "experience_required")
    private Integer experienceRequired;

    @Column(name = "job_role")
    private String jobRole;
}
