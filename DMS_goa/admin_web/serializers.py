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

class DMS_State_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_State
        fields = '__all__'

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
        
class DMS_Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Group
        fields = '__all__'

class DMS_Department_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Department
        fields = '__all__'


class DMS_State_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_State
        fields = '__all__'

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
        
class DMS_Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Group
        fields = '__all__'

class DMS_Department_Serializer(serializers.ModelSerializer):
    class Meta:
        model = DMS_Department
        fields = '__all__'