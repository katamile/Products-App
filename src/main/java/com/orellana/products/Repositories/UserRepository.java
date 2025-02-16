package com.orellana.products.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orellana.products.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
