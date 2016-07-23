package com.so_cili.jfinal.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;

public class ParaHandler extends Handler {

	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		if (target.indexOf("/search") >= 0) {
			String[] arr = target.split("/");
			if (arr.length <= 2 || "".equals(arr[2])) {
				return;
			}
			
			request.setAttribute("keyword", arr[2]);
			if (arr.length >=4 ) {
				Integer page = 1;
				try {
					page = Integer.parseInt(arr[3]);
				} catch (Exception e) {}
				request.setAttribute("page", page);
			} else {
				request.setAttribute("page", 1);
			}
			next.handle("/search/", request, response, isHandled);
		}
		else
			next.handle(target, request, response, isHandled);
	}

}
