package com.so_cili.jfinal.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class InfoValidator extends Validator {

	@Override
	protected void validate(Controller c) {
		validateLong(0, "", "");
	}

	@Override
	protected void handleError(Controller c) {
		c.renderError(404);
	}

}
