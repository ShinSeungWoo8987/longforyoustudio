package com.LongForYou.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.LongForYou.server.model.Member;

@Component
@Service(value = "jwtUserDetails")
public class JwtUserDetailsService implements UserDetailsService {
	@Value("${jwt.secret}")
	private String secret;
	
	@Autowired
	private LongForYouService longForYouService;

	@Override
    public UserDetails loadUserByUsername(String username) {
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		try {
			Member member = this.longForYouService.getMember(username);
			roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			return new User(member.getUse_id(), member.getUse_pw(), roles);
		}catch (UsernameNotFoundException e) {
			roles.add(new SimpleGrantedAuthority("ROLE_UNDEFINEDUSER"));
			return new User("", " ", roles);
		}
    }
}
