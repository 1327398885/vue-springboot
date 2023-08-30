package com.sun.springboot.aspect;


import com.sun.springboot.util.ApiSecurityUtil;
import com.sun.springboot.util.JsonUtil;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;


/**
 * @author sungang
 * @date 2021/10/15 5:15 下午
 */
@Aspect
@Component
public class SafetyAspect {

    /**
     * Pointcut 切入点
     * 匹配com.zykj.heliu.controller包下面的所有方法
     */
    @Pointcut("execution(* com.sun.springboot.controller..*.*(..))")
    public void safetyAspect() {
    }

    /**
     * 环绕通知
     */
    @Around(value = "safetyAspect()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert attributes != null;
        //request对象
        HttpServletRequest request = attributes.getRequest();

        //http请求方法  post get
        String httpMethod = request.getMethod().toLowerCase();

        //method方法
        Method method = ((MethodSignature) pjp.getSignature()).getMethod();

        //method方法上面的注解
        Annotation[] annotations = method.getAnnotations();

        //方法的形参参数
        Object[] args = pjp.getArgs();

        //是否有@Decrypt
        boolean hasDecrypt = false;
        //是否有@Encrypt
        boolean hasEncrypt = false;
        for (Annotation annotation : annotations) {
            if (annotation.annotationType() == Decrypt.class) {
                hasDecrypt = true;
            }
            if (annotation.annotationType() == Encrypt.class) {
                hasEncrypt = true;
            }
        }

        //执行方法之前解密，且只拦截post请求
        if ("post".equals(httpMethod) && hasDecrypt) {
            //api解密
            String decrypt = ApiSecurityUtil.decrypt();

            //注：参数最好用Vo对象来接参，单用String来接，args有长度但获取为空，很奇怪不知道为什么
            if(args.length > 0){
                args[0] = JsonUtil.parse(decrypt, args[0].getClass());
            }
        }

        //执行并替换最新形参参数   PS：这里有一个需要注意的地方，method方法必须是要public修饰的才能设置值，private的设置不了
        Object o = pjp.proceed(args);

        //返回结果之前加密
        if (hasEncrypt) {
            //api加密，转json字符串并转成Object对象，设置到Result中并赋值给返回值o
            o = ApiSecurityUtil.encrypt(o);
        }

        //返回
        return o;
    }
}