package com.sun.springboot.aspect;

import java.lang.annotation.*;

/**
 * @author sungang
 * @date 2021/10/15 5:14 下午
 * 加密注解
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Encrypt {

}

