module.exports = {
  productList: {
    query:
      "select t1.*,t2.path, t3.category1, t3.category2, t3.category3 from t_product t1, t_image t2, t_category t3 where t1.id = t2.product_id and t2.type = 1 and t1.category_id =t3.id  ",
  },
  productList2: {
    query:
      "select t3.*, t4.path from (select t1.* ,t2.category1, t2.category2,t2.category3 from t_product t1, t_category t2 where t1.category_id =t2.id) t3 left join (select * from t_image where type=1) t4 on t3.id = t4.product_id",
  },
  productDetail: {
    query:
      "select t1.*,t2.path,t3.category1,t3.category2, t3.category3 from t_product t1, t_image t2, t_category t3 where t1.id=? and t1.id=t2.product_id and t2.type=3 and t1.category_id = t3.id",
  },
  productMainImages: {
    query: "select * from t_image where product_id =? and type =2",
  },
  productInsert: {
    query: "inset into t_product set ?",
  },
  productImageInsert: {
    query: "inset into t_image set ?",
  },
  imageList: {
    query: "select * from t_image where product_id=?",
  },
  imageDelete: {
    query: "delete from t_image where id=?",
  },
  productDelete: {
    query: "delete from t_product where id=?",
  },
  categoryList: {
    query: "select * from t_category",
  },
  sellerList: {
    query: "select * from t_seller",
  },
  signUp: {
    query: "insert into t_user set ? on duplicate key update ?",
  },
  customerInsert: {
    query: "insert into customers set ?",
  },
  customerList: {
    query: "select * from customers ",
  },
  memberList: {
    query: "select * from member where ? LIMIT 1000",
  },
  memberListCount: {
    query: "select count(*) cnt from member where ?",
  },
  memberListOne: {
    query: "select * from member where member_id=? LIMIT 1000",
  },
  memberListOneCheck: {
    query: "select * from member where member_id=? and member_pw=? LIMIT 1000",
  },
  memberOne: {
    query: "select * from member where member_id=?  LIMIT 1000",
  },
  memberInsert: {
    query: "insert into member set ?",
  },
  memberInsertOne: {
    query:
      "insert into member(member_id,member_nm,member_pw,member_pw_salt) values(?,?,?,?)",
  },
  memberUpdateOne: {
    query: "update member set ? where member_id=?",
  },
  memberDeleteOne: {
    query: "update member set delete_yn='Y' where member_id=?",
  },
  memberRecoverOne: {
    query: "update member set delete_yn='N' where member_id=? ",
  },
  memberClickOne: {
    query: "select * from clickTable where member_id=? LIMIT 1000",
  },
  memberClickInsert: {
    query: "insert into clickTable(member_id,click_no) values(?,?)",
  },
  memberClickUpdate: {
    query: "update clickTable set click_no=? where member_id=?",
  },
  articleInsertOne: {
    query:
      "insert into article(writer_id,writer_nm,title,text,board_no) values(?,?,?,?,?)",
  },
  articleClickUpdate: {
    query: "update article set click_cnt=? where article_no=?",
  },
  articleList: {
    query:
      "select * from article where board_no=? and delete_yn='N'  and board_no not in (10) order by article_no desc LIMIT 1000",
  },
  dailyArticleList: {
    query:
      "select * from article where writer_id=? and board_no=? and delete_yn='N'  order by article_no desc LIMIT 1000",
  },
  articleAdminList: {
    query:
      "select * from article where board_no=?  order by article_no desc LIMIT 1000",
  },
  articleView: {
    query:
      "select * from article where article_no=? and board_no not in (9,10) LIMIT 1000",
  },
  dailyArticleView: {
    query:
      "select * from article where  article_no=? and writer_id=?  LIMIT 1000",
  },
  articleUpdateOne: {
    query:
      "update article set writer_nm=? , title=?  , text=?  , board_no=?  where article_no=?",
  },

  articleDeleteYnOne: {
    query: "update article set delete_yn=?   where article_no=?",
  },
  dailyArticleDeleteYnOne: {
    query:
      "update article set delete_yn=?   where article_no=?  and writer_id=? ",
  },
};
