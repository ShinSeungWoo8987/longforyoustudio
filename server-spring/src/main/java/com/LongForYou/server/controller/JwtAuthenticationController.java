package com.LongForYou.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.LongForYou.server.config.JwtTokenUtil;
import com.LongForYou.server.model.JwtRequest;
import com.LongForYou.server.model.JwtResponse;
import com.LongForYou.server.service.JwtUserDetailsService;


@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

//    	System.out.println(authenticationRequest.getUsername());
//    	System.out.println(authenticationRequest.getPassword());
//    	
//    	System.out.println("암호화된 비밀번호 확인-----------------------------------------");
//    	System.out.println(bcrypt.encode(authenticationRequest.getPassword()));
    	
    	authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
    	
        // req로 받은 username을 통해 userDetails를 가져오고, 
    	final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        // 가져온 userDetails를 통해 토큰을 생성해준다. 이후 위에서 실행한 authenticate메소드에 따라 생성된 token과 가져온 값을 비교하여 일치하는지 자동으로 확인된다.
        final String token = jwtTokenUtil.generateToken(userDetails);
        
        return ResponseEntity.ok(new JwtResponse(token, userDetails.getAuthorities().toString(), userDetails.getUsername()));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
        	// request로 들어온 아이디/비밀번호 값으로 UsernamePasswordAuthenticationToken객체를 생성한다.
        	// authenticationManager.authenticate를 통해 request의 username을 통해 가져온 userDetails와 자동으로 매칭하여 일치하는지 확인한다.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
