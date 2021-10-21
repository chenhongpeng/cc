$(function(){
    $(".checkall").change(function(){
        // console.log($(this).prop("checked"));       
        //获取这个按钮的状态，如果全选按钮被选上，那么其它3个小按钮的选中状态跟全选按钮一样
        $(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));

        //修改背景颜色
        if($(this).prop("checked")){ //它被选中
            $(".cart-item").addClass("check-cart-item"); //如果全选按钮被选中，那么小复选框的背景添加check-cart-item类名
        }else{
            $(".cart-item").removeClass("check-cart-item"); //否则清除
        }
        
    });

    $(".j-checkbox").change(function(){
        // console.log($(".j-checkbox:checked").length); 点击后获取复选框的个数，如果这个数字等于3时，那么全选按钮被选上
        if($(".j-checkbox:checked").length === $(".j-checkbox").length){           
            $(".checkall").prop("checked",true);
        }else{
            $(".checkall").prop("checked",false);
        }

        //修改背景颜色
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item"); //如果小复选框被选中，那么它对应的背景添加类名check-cart-item
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }

    })
    
    
   

    //3.订单数量的加减
    
    $(".increment").click(function(){
        //获取这个+号兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++
        //点击后文本框的值随着加号的点击每次加1
        $(this).siblings(".itxt").val(n);

        // 结算金额
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1); //截取第1个
        // console.log(p);
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + (n * p).toFixed(2));
        getSum();
    })

    $(".decrement").click(function(){
        //获取这个-号兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        if(n == 0){
            // $(this).disable = true;
            return false;  //返回值为false，下面代码不再执行
        }
      
        n--;
        //点击后文本框的值随着加号的点击每次减1
        $(this).siblings(".itxt").val(n);

        //结算金额
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1); //截取第1个
        // console.log(p);
        
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + (n * p).toFixed(2));
        getSum();
    })

    //直接修改表单值的解决方法
    $(".itxt").change(function(){
        //n表示表单里面的值（数量）
        var n = $(this).val();
        //获取文本框的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1); //截取第1个
        //最终小计里面的值 = 数量 * 单价
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + (n * p).toFixed(2));
        getSum();
    })



    //计算总计和总金额
    getSum(); //打开页面先运行一遍函数
    function getSum(){
        var count = 0; //总件数
        var money = 0; //总金额
        $(".itxt").each(function(i,ele){
            //遍历表单里面的值相加后赋予给count
            count = count + parseInt($(ele).val());
            // console.log(count);
            
        });
        //计算总计里面的值 = count
        $(".amount-sum em").text(count);

        $(".p-sum").each(function(i,ele){
            //小计里面的值相加后赋予给money，因为小计里面有小数，所以改为浮点型
            money = money + parseFloat($(ele).text().substr(1));  //substr（1）去掉￥

        })
        $(".price-sum em").text("￥"+ money.toFixed(2))
    }



    //清空购物车
    $(".p-action a").click(function(){ //点击删除按钮
        $(this).parents(".cart-item").remove(); //删除.cart-item类名对应的div
        getSum(); //为了
    })
    //删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove(); //如果商品对应的复选框被选上，那么点击删除选中商品，删除被勾上的复选框（被选上的复选框作删除操作）
        getSum();
    })
    //清空购物车
    $(".clear-all").click(function(){
        $(".cart-item").remove();  //点击小按钮，清空类名为.cart-item的div
        getSum();
    })
})