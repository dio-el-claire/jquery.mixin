(function($) {
	"use strict"
	
	if (!$.mixin) {
		$.mixin = function() {
			var args = arguments,
				obj = args[0], 
				usage = 'Usage: $.mixin(object, method_name, method_src, data)',
				name, method, data;

			if (args.length > 2) {
				name   = args[1];
				method = args[2];
				data   = args[3];
				
				if ((typeof name != 'string' || !name) || typeof method != 'function') {
					throw(new Error(usage));
				}
				
				obj[name] = function() {
					method.apply(obj, ($.isArray(data) ? data : []).concat([].slice.call(arguments)));
				}

			} else if (arguments[1] instanceof Object) {
				$.each(arguments[1], function(method, src) {
					if (typeof src == 'function') {
						obj[method] = $.proxy(src, obj);
					}	
				});
			} else {
				throw(usage);
			}

		}
		
	}
	
})(jQuery)