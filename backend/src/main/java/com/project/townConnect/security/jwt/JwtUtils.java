package com.project.townConnect.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.project.townConnect.model.UserModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${smallCity.app.jwtSecret}")
  private String jwtSecret;

  @Value("${smallCity.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(UserModel userPrincipal) {
    return generateTokenFromUsername(userPrincipal);
  }

  public String generateTokenFromUsername(UserModel user) {
    Map<String,String> data = new HashMap<>() ;
    data.put("id",user.getId().toString());
    data.put("username",user.getUsername());
    data.put("email",user.getEmail());
    data.put("profilePicture",user.getProfilePicture());
    data.put("createdAt",user.getCreatedAt().toString());
    data.put("isAdmin",Boolean.toString(user.getIsAdmin()));
    data.put("updatedAt",user.getUpdatedAt().toString());
    Map<String, Object> claims = new HashMap<>(data);

    return Jwts.builder().setClaims(claims).setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException e) {
      logger.error("Invalid JWT signature: {}", e.getMessage());
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

}
