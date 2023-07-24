package com.vvs.peekpick.oauth.repository;

import com.vvs.peekpick.oauth.model.users.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {

    private Map<String,Object> members = new HashMap<String, Object>();

    public User findByUsername(String username){
        if(members.containsKey(username)){
            return (User)members.get(username);
        }
        return null;
    }
    public void register(User member){
        if(members.containsKey(member.getUsername())){
            return;
        }
        System.out.println(member.toString());
        members.put(member.getUsername(), member);
    }
}
