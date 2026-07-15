package com.coditas.auth_service.entity;

import com.coditas.auth_service.enums.Education;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.Year;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "highest_education")
    private Education highestEducation;
    @Column(name = "marks_scored")
    private Double marksScored;
    @Column(name = "year_of_passing")
    private Year yearOfPassing;
    @Column(name = "cover_letter")
    private String coverLetter;
    @Column(name = "work_experience")
    private Integer workExperience;
    @Column(name = "profile_photo")
    private String profilePhoto;


}
