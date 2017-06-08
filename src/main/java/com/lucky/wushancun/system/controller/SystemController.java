package com.lucky.wushancun.system.controller;

import com.lucky.common.util.BaseCondition;
import com.lucky.common.util.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * Created by acer on 2017/6/7.
 */
@Controller
public class SystemController extends BaseController{
    private final String viewPath = "system/";

    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response){
        return viewPath.concat("sys_login");
    }

    @RequestMapping(value = "manage",method = {RequestMethod.GET,RequestMethod.POST})
    public String manage(Model model,HttpServletRequest request,HttpServletResponse response){
        return viewPath.concat("sys_manage");
    }
}
