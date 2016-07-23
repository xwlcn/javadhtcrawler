package com.so_cili.dhtcrawler.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA1Util {

	private MessageDigest messageDigest;

    final char[] digits = {
            '0' , '1' , '2' , '3' , '4' , '5' ,
            '6' , '7' , '8' , '9' , 'a' , 'b' ,
            'c' , 'd' , 'e' , 'f' , 'g' , 'h' ,
            'i' , 'j' , 'k' , 'l' , 'm' , 'n' ,
            'o' , 'p' , 'q' , 'r' , 's' , 't' ,
            'u' , 'v' , 'w' , 'x' , 'y' , 'z'
    };
	public SHA1Util() {
		super();
		try {
            messageDigest = MessageDigest.getInstance("SHA-1");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

	}
    
	public String SHA1(byte[] buff) {
    	messageDigest.update(buff);
        return ByteUtil.byteArrayToHex(messageDigest.digest());
    }
    
}
