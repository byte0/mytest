/*
    �ϴ�ͼƬ�����ͼƬ
*/
define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
    // ���õ���ѡ��
    util.setMenu('/course/add'); 
    // ��ȡ�γ�id
    var cs_id = util.qs('cs_id');
    // ��ѯͼƬ��Ϣ
    // ��ѯͼƬ��Ϣ
    $.ajax({
        type : 'get',
        url : '/api/course/picture',
        data : {cs_id :cs_id},
        dataType : 'json',
        success : function(data){
            // ��Ⱦģ��
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            var preview = $('.preview img'),jcrop_api;
            function foo(){
                var sum = function(){
                    console.log(123);
                };
                var arr = [];
                for (var i = 0; i < arr.length; i++) {
                    arr.push(i);
                }
                console.log(arr);
            }
            // �ϴ�ͼƬ
            // �����ļ��ϴ�
            $('#upfile').uploadify({
                width : 80,
                height : 'auto',
                buttonText : 'ѡ��ͼƬ',
                buttonClass : 'btn btn-success btn-sm',
                fileObjName:'cs_cover_original',
                itemTemplate : '<span></span>',
                formData : {cs_id:cs_id},
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/cover',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                    $('#cropPic').prop('disabled',false);
                }
            });
            // ���ͼƬ���а�ťʱ���в��д���
            $('#cropPic').click(function(){

                if($(this).attr('data-status') == 'save'){
                    // ����ͼƬ�Ĳ���(�ύ����ͼƬ�ĳߴ���Ϣ)
                    $('#cropForm').ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/picture',
                        data : {cs_id : cs_id},
                        dataType : 'json',
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/course/lesson?cs_id=' + data.result.cs_id;
                            }
                        }
                    });
                }else{
                    $(this).attr('data-status','save')
                           .val('����ͼƬ');
                    cropPic();
                }
            });
            // ͼƬ���й���
            function cropPic(){
                // ����ԭ����ͼƬ����ʵ������
                jcrop_api && jcrop_api.destroy();
                preview.Jcrop({
                    boxWidth : 400,
                    aspectRatio : 2
                    // setSelect: [10, 10, 100, 100],
                },function(){
                    // ����ԭ���Ĳ���ʵ������
                    // ����ԭ���Ĳ���ʵ������
                    jcrop_api = this;
                    // ����ѡȡ�ĳߴ�
                    var width = jcrop_api.ui.stage.width,
                        height = jcrop_api.ui.stage.height,
                        x = 0;
                        y = height/4;
                    // ����ѡȡ
                    jcrop_api.newSelection();
                    jcrop_api.setSelect([x,y,width,height/2]);
                    jcrop_api.initComponent('Thumbnailer', {
                        width: 240,
                        height: height,
                        thumb : '.thumb'
                    });
                    // ��Ӵ���
                    function abc(data){
                        var sum = 0;
                        for (var i = 0; i < arr.length; i++) {
                            sum += arr[i];
                        }
                        console.log(sum);
                    }
                    // ����ѡ���ı仯
                    preview.parent().on('cropend',function(e,s,c){
                       $('#crop_x').val(c.x);
                       $('#crop_y').val(c.y);
                       $('#crop_w').val(c.w);
                       $('#crop_w').val(c.w);
                       $('#crop_h').val(c.h);
                    });
                });
            }

        }
    });
});