package com.xupdate;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.xuexiang.xupdate.XUpdate;


/**
 * 版本更新重试提示弹窗
 */
public class RetryUpdateTipDialog extends AppCompatActivity implements DialogInterface.OnDismissListener {

    public static final String KEY_CONTENT = "com.xuexiang.flutter_xupdate.KEY_CONTENT";
    public static final String KEY_URL = "com.xuexiang.flutter_xupdate.KEY_URL";


    /**
     * 显示版本更新重试提示弹窗
     *
     * @param content
     * @param url
     */
    public static void show(String content, String url) {
        Intent intent = new Intent(XUpdate.getContext(), RetryUpdateTipDialog.class);
        intent.putExtra(KEY_CONTENT, content);
        intent.putExtra(KEY_URL, url);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        XUpdate.getContext().startActivity(intent);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        String content = getIntent().getStringExtra(KEY_CONTENT);
        final String url = getIntent().getStringExtra(KEY_URL);

        if (TextUtils.isEmpty(content)) {
            content = "更新下载速度太慢了，是否考虑切换下载方式？";
        }

        AlertDialog dialog = new AlertDialog.Builder(this)
                .setMessage(content)
                .setPositiveButton("是", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        goWeb(url);
                    }
                })
                .setNegativeButton( "否", null)
                .setCancelable(false)
                .show();
        dialog.setOnDismissListener(this);
    }

    /**
     * 以系统API的方式请求浏览器
     *
     * @param url
     */
    public void goWeb(final String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        try {
            startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        finish();
    }
}
