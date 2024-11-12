package com.xupdate;

import android.text.TextUtils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.xuexiang.xupdate._XUpdate;
import com.xuexiang.xupdate.entity.UpdateEntity;
import com.xuexiang.xupdate.proxy.impl.DefaultUpdateDownloader;
import com.xuexiang.xupdate.service.OnFileDownloadListener;

/**
 * 重写DefaultUpdateDownloader，在取消下载时，可弹出提示
 */
public class RetryUpdateDownloader extends DefaultUpdateDownloader {

    private boolean mIsStartDownload;

    /**
     * 取消下载时，是否弹出重试提示
     */
    private boolean mEnableRetry;

    /**
     * 重试提示弹窗的内容
     */
    private String mRetryContent;
    /**
     * 重试的下载路径
     */
    private String mRetryUrl;

    public RetryUpdateDownloader(boolean enableRetry, String retryContent, String retryUrl) {
        mEnableRetry = enableRetry;
        mRetryContent = retryContent;
        mRetryUrl = retryUrl;
    }

    @Override
    public void startDownload(@NonNull UpdateEntity updateEntity, @Nullable OnFileDownloadListener downloadListener) {
        super.startDownload(updateEntity, downloadListener);
        mIsStartDownload = true;

    }

    @Override
    public void cancelDownload() {
        super.cancelDownload();
        if (mIsStartDownload) {
            mIsStartDownload = false;

            if (mEnableRetry && !TextUtils.isEmpty(mRetryUrl)) {
                RetryUpdateTipDialog.show(mRetryContent, mRetryUrl);
            } else {
                _XUpdate.onUpdateError(4002, "取消下载");
            }
        }
    }



}
