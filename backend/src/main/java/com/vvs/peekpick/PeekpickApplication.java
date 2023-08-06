package com.vvs.peekpick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* localhost에서
* (
		exclude = {
				org.springframework.cloud.aws.autoconfigure.con   text.ContextInstanceDataAutoConfiguration.class,
				org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
				org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
		}
)
* */
@SpringBootApplication
public class PeekpickApplication {
	public static void main(String[] args) {
		SpringApplication.run(PeekpickApplication.class, args);
	}

}
