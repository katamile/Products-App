package com.orellana.products.Services.UserServices;

import com.orellana.products.DTO.LoginRequest;
import com.orellana.products.DTO.RegisterRequest;
import com.orellana.products.DTO.Response;
import com.orellana.products.DTO.UserDTO;
import com.orellana.products.Entities.User;

public interface IUserService {
    Response registerUser(RegisterRequest registerRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getCurrentLoggedInUser();
    Response updateUser(Long id, UserDTO userDTO);
    Response deleteUser(Long id);
    Response getUserTransactions(Long id);
}