package Ecommerce.project.Controller;

import Ecommerce.project.DTO.LoginRequest;
import Ecommerce.project.DTO.LoginResponse;
import Ecommerce.project.DTO.RegisterRequest;
import Ecommerce.project.Model.User;
import Ecommerce.project.Service.AuthService;
import Ecommerce.project.Service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
       return new ResponseEntity<>(
               authService.register(request),HttpStatus.CREATED
       );
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        User user=authService.authenticate(request);
        String token=jwtService.generateToken(request.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setExpires(jwtService.getJwtExpiration());
        return new ResponseEntity<>(
                loginResponse,HttpStatus.OK
        );
    }

}
