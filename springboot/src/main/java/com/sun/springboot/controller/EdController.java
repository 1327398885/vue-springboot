package com.sun.springboot.controller;

import com.sun.springboot.aspect.Decrypt;
import com.sun.springboot.aspect.Encrypt;
import com.sun.springboot.response.Result;
import com.sun.springboot.vo.LoginVo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sung
 * 测试aop方式加解密
 * application/x-www-form-urlencoded 方式
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "ed")
public class EdController {

    @Decrypt
    @Encrypt
    @PostMapping("login")
    public Result<String> login(LoginVo loginVo) {
        System.out.println(loginVo.getUsername() + "---" + loginVo.getPassword());
        return Result.of(loginVo.getUsername());
    }

}

