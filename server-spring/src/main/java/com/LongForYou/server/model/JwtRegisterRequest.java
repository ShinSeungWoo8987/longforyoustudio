package com.LongForYou.server.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtRegisterRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String username;
    private String password;
    private String name;
    private String birth;
    private String phone;
    private String postcode;
    private String address1;
    private String address2;

    //need default constructor for JSON Parsing
    public JwtRegisterRequest()
    {

    }
}
