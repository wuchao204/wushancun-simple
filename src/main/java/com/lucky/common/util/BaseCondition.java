package com.lucky.common.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by lucky on 2017/6/7.
 */
public class BaseCondition {

    /**
     * 将用户信息写入SESSION
     * @param request
     * @param sessionAttributeName
     * @param sessionValue
     * @return
     */
    public boolean writeToHttpSession(HttpServletRequest request, String sessionAttributeName, Object sessionValue) {
        HttpSession session = request.getSession();
        if (null == session.getAttribute(sessionAttributeName)) {
            session.setAttribute(sessionAttributeName, sessionValue);
            return true;
        }else{
            removeSessionAttribute(request, sessionAttributeName);
            session.setAttribute(sessionAttributeName, sessionValue);
            return true;
        }
    }

    /**
     * 将用户信息移除SESSION
     * @param request
     * @param attributeName
     * @return
     */
    public boolean removeSessionAttribute(HttpServletRequest request, String attributeName) {
        HttpSession session = request.getSession();
        if (session.getAttribute(attributeName) != null) {
            session.removeAttribute(attributeName);
            return true;
        }
        return false;
    }
}
