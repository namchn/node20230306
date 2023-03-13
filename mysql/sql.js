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
    query: "select * from member where ?",
  },
  memberListCount: {
    query: "select count(*) cnt from member where ?",
  },
  memberListOne: {
    query: "select * from member where member_id=?",
  },
  memberListOneCheck: {
    query: "select * from member where member_id=? and member_pw=?",
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
    query: "update member set delete_yn='N' where member_id=?",
  },
};
