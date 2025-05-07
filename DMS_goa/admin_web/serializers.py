from rest_framework import serializers
from .models import *

class DMS_department_serializer(serializers.ModelSerializer):
    class Meta:
        model=DMS_Department
        fields='__all__'

class DMS_Group_serializer(serializers.ModelSerializer):
    class Meta:
        model=DMS_Group
        fields='__all__'

class DMS_Employee_serializer(serializers.ModelSerializer):
    class Meta:
        model=DMS_Employee
        fields='__all__'

class DMS_District_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_District
        fields = '__all__'
    
class DMS_Tahsil_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Tahsil
        fields = '__all__'

class DMS_City_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_City
        fields = '__all__'

class DMS_State_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_State
        fields = '__all__'
        
class DMS_Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Group
        fields = '__all__'
        
class DMS_Department_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Department
        fields = '__all__'
              

# ============= Permission Module Serializer ============================

class Mmoduleserializer(serializers.ModelSerializer):
     grp_name = serializers.CharField(source='mod_group_id.grp_name', allow_null=True)
     department_id = serializers.CharField(source='mod_group_id.dep_id.dep_id', allow_null=True)
     department_name = serializers.CharField(source='mod_group_id.dep_id.dep_name', allow_null=True)

     class Meta:
          model = DMS_Module
          fields = ['mod_id', 'mod_name', 'mod_group_id','grp_name', 'department_id', 'department_name']


class permission_sub_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_SubModule
        fields = '__all__'



        

