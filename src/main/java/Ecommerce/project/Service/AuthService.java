package Ecommerce.project.Service;
import Ecommerce.project.DTO.LoginRequest;
import Ecommerce.project.DTO.RegisterRequest;
import Ecommerce.project.Model.Role;
import Ecommerce.project.Model.User;
import Ecommerce.project.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
   @Autowired
    private UserRepo userRepository;
   @Autowired
   private PasswordEncoder passwordEncoder;
   @Autowired
   private AuthenticationManager authenticationManager;

   public User register(RegisterRequest registerRequest) {
       User user = new User();
       user.setFullName(registerRequest.getFullName());
       user.setEmail(registerRequest.getEmail());
       user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
       user.setRole(Role.USER);
       return userRepository.save(user);
   }
   public User authenticate(LoginRequest loginRequest) {
       authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken
                       (loginRequest.getEmail(), loginRequest.getPassword())
       );
       return userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(
               () -> new RuntimeException("Invalid email or password")
       );
   }



}
