from django.db import models

class DMS_State(models.Model):
    state_id = models.AutoField(primary_key=True)
    state_name = models.CharField(max_length=255)
    state_is_deleted = models.BooleanField(default=False)
    state_added_by = models.CharField(max_length=255, null=True, blank=True)
    state_added_date = models.DateTimeField(auto_now=True)
    state_modified_by = models.CharField(max_length=255, null=True, blank=True)
    state_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)

class DMS_District(models.Model):
    dis_id = models.AutoField(primary_key=True)
    state_id = models.ForeignKey(DMS_State, on_delete=models.CASCADE)
    dis_name = models.CharField(max_length=255)
    dis_is_deleted = models.BooleanField(default=False)
    dis_added_by = models.CharField(max_length=255, null=True, blank=True)
    dis_added_date = models.DateTimeField(auto_now=True,)
    dis_modified_by = models.CharField(max_length=255, null=True, blank=True)
    dis_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)

class DMS_Tahsil(models.Model):
    tah_id = models.AutoField(primary_key=True)
    dis_id = models.ForeignKey(DMS_District, on_delete=models.CASCADE)
    tah_name = models.CharField(max_length=255)
    tah_is_deleted = models.BooleanField(default=False)
    tah_added_by = models.CharField(max_length=255, null=True, blank=True)
    tah_added_date = models.DateTimeField(auto_now=True,)
    tah_modified_by = models.CharField(max_length=255, null=True, blank=True)
    tah_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)

class DMS_City(models.Model):
    cit_id = models.AutoField(primary_key=True)
    tah_id = models.ForeignKey(DMS_Tahsil, on_delete=models.CASCADE)
    cit_name = models.CharField(max_length=255)
    cit_is_deleted = models.BooleanField(default=False)
    cit_added_by = models.CharField(max_length=255, null=True, blank=True)
    cit_added_date = models.DateTimeField(auto_now=True,)
    cit_modified_by = models.CharField(max_length=255, null=True, blank=True)
    cit_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)

class DMS_Department(models.Model):
    dep_id = models.AutoField(primary_key=True)
    dep_name = models.CharField(max_length=255)
    dep_is_central = models.BooleanField(default=False)
    state_id = models.ForeignKey(DMS_State, on_delete=models.CASCADE)
    dis_id = models.ForeignKey(DMS_District, on_delete=models.CASCADE)
    tah_id = models.ForeignKey(DMS_Tahsil, on_delete=models.CASCADE)
    cit_id = models.ForeignKey(DMS_City, on_delete=models.CASCADE)
    dep_is_deleted = models.BooleanField(default=False)
    dep_added_by = models.CharField(max_length=255, null=True, blank=True)
    dep_added_date = models.DateTimeField(auto_now=True)
    dep_modified_by = models.CharField(max_length=255, null=True, blank=True)
    dep_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    

class DMS_Group(models.Model):
    grp_id = models.AutoField(primary_key=True)
    grp_code = models.CharField(max_length=100)
    dep_id = models.ForeignKey(DMS_Department, on_delete=models.CASCADE)
    permission_status = models.IntegerField(null=True, blank=True)
    grp_name = models.CharField(max_length=255)
    grp_is_deleted = models.BooleanField(default=False)
    grp_added_date = models.DateTimeField(auto_now=True)
    grp_added_by = models.CharField(max_length=255, null=True, blank=True)
    grp_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    grp_modified_by = models.CharField(max_length=255, null=True, blank=True)
    

class DMS_Module(models.Model):
    mod_id = models.AutoField(primary_key=True)
    mod_code = models.CharField(max_length=100)
    mod_name = models.CharField(max_length=255)
    mod_group_id = models.ForeignKey(DMS_Group, on_delete=models.CASCADE)
    mod_is_deleted = models.BooleanField(default=False)
    mod_added_date = models.DateTimeField(auto_now=True)
    mod_added_by = models.CharField(max_length=255, null=True, blank=True)
    mod_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    mod_modified_by = models.CharField(max_length=255, null=True, blank=True)
    

class DMS_SubModule(models.Model):
    sub_mod_id = models.AutoField(primary_key=True)
    mod_id = models.ForeignKey(DMS_Module, on_delete=models.CASCADE)
    sub_mod_name = models.CharField(max_length=255)
    sub_mod_is_deleted = models.BooleanField(default=False)
    sub_mod_added_date = models.DateTimeField(auto_now=True)
    sub_mod_added_by = models.CharField(max_length=255, null=True, blank=True)
    sub_mod_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    sub_mod_modified_by = models.CharField(max_length=255, null=True, blank=True)

class DMS_Action(models.Model):
    ac_id = models.AutoField(primary_key=True)
    ac_name = models.CharField(max_length=255)
    sub_mod_id = models.ForeignKey(DMS_SubModule, on_delete=models.CASCADE)
    ac_is_deleted = models.BooleanField(default=False)
    ac_added_by = models.CharField(max_length=255, null=True, blank=True)
    ac_added_date = models.DateTimeField(auto_now=True)
    ac_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    ac_modified_by = models.CharField(max_length=255, null=True, blank=True)

class DMS_Permission(models.Model):
    per_id = models.AutoField(primary_key=True)
    grp_id = models.ForeignKey(DMS_Group, on_delete=models.CASCADE)
    mod_submod_per = models.TextField()  
    screen_no = models.CharField(max_length=100)
    per_is_deleted = models.BooleanField(default=False)
    per_added_date = models.DateTimeField(auto_now=True)
    per_added_by = models.CharField(max_length=255, null=True, blank=True)
    per_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    per_modified_by = models.CharField(max_length=255, null=True, blank=True)
    
class DMS_Employee(models.Model):
    emp_id = models.AutoField(primary_key=True)
    emp_name = models.CharField(max_length=255)
    emp_contact_no = models.CharField(max_length=15)
    emp_email = models.EmailField()
    emp_dob = models.DateField()
    emp_doj = models.DateField()
    grp_id = models.ForeignKey(DMS_Group,on_delete=models.CASCADE)
    emp_is_login = models.BooleanField(default=False)
    state_id = models.ForeignKey(DMS_State, on_delete=models.CASCADE)
    dis_id = models.ForeignKey(DMS_District, on_delete=models.CASCADE)
    tah_id = models.ForeignKey(DMS_Tahsil, on_delete=models.CASCADE)
    cit_id = models.ForeignKey(DMS_City, on_delete=models.CASCADE)
    emp_is_deleted = models.BooleanField(default=False)
    emp_added_date = models.DateTimeField(auto_now=True)
    emp_added_by = models.CharField(max_length=255, null=True, blank=True)
    emp_modified_date = models.DateTimeField(auto_now=True,null=True, blank=True)
    emp_modified_by = models.CharField(max_length=255, null=True, blank=True)
    
class DMS_WebLogin(models.Model):
    log_id = models.AutoField(primary_key=True)
    emp_id = models.ForeignKey(DMS_Employee, on_delete=models.CASCADE)
    emp_login_time = models.DateTimeField(auto_now=True)
    emp_logout_time = models.DateTimeField(null=True, blank=True)
    log_status = models.CharField(max_length=50) 
    log_added_date = models.DateTimeField(auto_now=True)
    log_added_by = models.CharField(max_length=255, null=True, blank=True)
    log_modified_by = models.CharField(max_length=255, null=True, blank=True)

