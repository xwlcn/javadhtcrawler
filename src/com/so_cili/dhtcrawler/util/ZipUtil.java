package com.so_cili.dhtcrawler.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipUtil {

	/**
	 * 
	 * 使用gzip进行压缩
	 */
	public static String gzip(String primStr) {
		if (primStr == null || primStr.length() == 0) {
			return primStr;
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		GZIPOutputStream gzip = null;
		try {
			gzip = new GZIPOutputStream(out);
			gzip.write(primStr.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (gzip != null) {
				try {
					gzip.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return new sun.misc.BASE64Encoder().encode(out.toByteArray());
	}

	/**
	 *
	 * <p>
	 * Description:使用gzip进行解压缩
	 * </p>
	 * 
	 * @param compressedStr
	 * @return
	 */
	public static String gunzip(String compressedStr) {
		if (compressedStr == null) {
			return null;
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ByteArrayInputStream in = null;
		GZIPInputStream ginzip = null;
		byte[] compressed = null;
		String decompressed = null;
		try {
			compressed = new sun.misc.BASE64Decoder().decodeBuffer(compressedStr);
			in = new ByteArrayInputStream(compressed);
			ginzip = new GZIPInputStream(in);

			byte[] buffer = new byte[1024];
			int offset = -1;
			while ((offset = ginzip.read(buffer)) != -1) {
				out.write(buffer, 0, offset);
			}
			decompressed = out.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (ginzip != null) {
				try {
					ginzip.close();
				} catch (IOException e) {
				}
			}
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
				}
			}
		}

		return decompressed;
	}

	public static final byte[] compress(String paramString) {  
        if (paramString == null)  
            return null;  
        ByteArrayOutputStream byteArrayOutputStream = null;  
        ZipOutputStream zipOutputStream = null;  
        byte[] arrayOfByte;  
        try {  
            byteArrayOutputStream = new ByteArrayOutputStream();  
            zipOutputStream = new ZipOutputStream(byteArrayOutputStream);  
            zipOutputStream.putNextEntry(new ZipEntry("0"));  
            zipOutputStream.write(paramString.getBytes());  
            zipOutputStream.closeEntry();  
            arrayOfByte = byteArrayOutputStream.toByteArray();  
        } catch (IOException localIOException5) {  
            arrayOfByte = null;  
        } finally {  
            if (zipOutputStream != null)  
                try {  
                    zipOutputStream.close();  
                } catch (IOException localIOException6) {  
            }  
            if (byteArrayOutputStream != null)  
                try {  
                    byteArrayOutputStream.close();  
                } catch (IOException localIOException7) {  
            }  
        }  
        return arrayOfByte;  
    }  
  
    @SuppressWarnings("unused")  
    public static final String decompress(byte[] paramArrayOfByte) {  
        if (paramArrayOfByte == null)  
            return null;  
        ByteArrayOutputStream byteArrayOutputStream = null;  
        ByteArrayInputStream byteArrayInputStream = null;  
        ZipInputStream zipInputStream = null;  
        String str;  
        try {  
            byteArrayOutputStream = new ByteArrayOutputStream();  
            byteArrayInputStream = new ByteArrayInputStream(paramArrayOfByte);  
            zipInputStream = new ZipInputStream(byteArrayInputStream);  
            ZipEntry localZipEntry = zipInputStream.getNextEntry();  
            byte[] arrayOfByte = new byte[1024];  
            int i = -1;  
            while ((i = zipInputStream.read(arrayOfByte)) != -1)  
                byteArrayOutputStream.write(arrayOfByte, 0, i);  
            str = new String(byteArrayOutputStream.toByteArray(), "UTF-8");  
        } catch (IOException localIOException7) {  
            str = null;  
        } finally {  
            if (zipInputStream != null)  
                try {  
                    zipInputStream.close();  
                } catch (IOException localIOException8) {  
                }  
            if (byteArrayInputStream != null)  
                try {  
                    byteArrayInputStream.close();  
                } catch (IOException localIOException9) {  
                }  
            if (byteArrayOutputStream != null)  
                try {  
                    byteArrayOutputStream.close();  
                } catch (IOException localIOException10) {  
            }  
        }  
        return str;  
    }
}
