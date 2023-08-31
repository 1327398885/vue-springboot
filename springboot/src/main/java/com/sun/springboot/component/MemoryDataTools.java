package com.sun.springboot.component;

import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;


/**
 * @author sunbt
 * @date 2023/8/31 22:16
 */
@Component
public class MemoryDataTools {

    // 使用ConcurrentHashMap实现内存存储数据
    private static ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();

    // 获取数据
    public Object get(String key) {
        // 获取缓存中的数据
        return cache.get(key);
    }

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    // 存储数据
    public void put(String key, Object value, long expireTime, TimeUnit timeUnit) {
        // 创建过期时间
        ExpiringValue expiringValue = new ExpiringValue(value, expireTime, timeUnit);

        // 存储数据
        cache.put(key, expiringValue);
    }

    // 删除数据
    public void remove(String key) {
        // 删除缓存中的数据
        cache.remove(key);
    }

}

// ExpiringValue类用于保存过期时间
class ExpiringValue implements java.io.Serializable {

    private static final long serialVersionUID = 1L;
    private final Object value;
    private final long expireTime;
    private final TimeUnit timeUnit;

    // 构造方法
    public ExpiringValue(Object value, long expireTime, TimeUnit timeUnit) {
        this.value = value;
        this.expireTime = expireTime;
        this.timeUnit = timeUnit;
    }

    // 获取数据的值
    public Object getValue() {
        return value;
    }

    // 获取过期时间
    public long getExpireTime() {
        return expireTime;
    }

    // 获取时间单位
    public TimeUnit getTimeUnit() {
        return timeUnit;
    }

    // 判断两个值是否相等
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ExpiringValue that = (ExpiringValue) obj;
        return expireTime == that.expireTime && timeUnit == that.timeUnit && Objects.equals(value, that.value);
    }

    // 获取哈希值
    @Override
    public int hashCode() {
        return Objects.hash(value, expireTime, timeUnit);
    }

}