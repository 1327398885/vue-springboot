package com.sun.springboot.controller;


import com.sun.springboot.component.MemoryDataTools;
import com.sun.springboot.constant.RsaConstant;
import com.sun.springboot.util.RsaUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

/**
 * @author sunbt
 * @date 2023/8/31 21:48
 */
@Api(tags = "加密方法")
@RestController
@RequestMapping(value = "rsa")
public class RsaController {

    @Resource
    MemoryDataTools memoryDataTools;


    @ApiOperation("获取后台公钥")
    @GetMapping("getPublicKey")
    public String getPublicKey() {
        return memoryDataTools.get(RsaConstant.RSA_PUBLIC_KEY).toString();
    }

    @PostConstruct
    private void initRsaKey() {
        String publicKey = RsaUtil.getPublicKey();
        String privateKey = RsaUtil.getPrivateKey();
        memoryDataTools.put(RsaConstant.RSA_PUBLIC_KEY, publicKey);
        memoryDataTools.put(RsaConstant.RSA_PRIVATE_KEY, privateKey);
    }
}
