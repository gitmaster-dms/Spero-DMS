from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('department_post/',DMS_department_post_api.as_view(),name='department_post'),
    path('department_put/<int:dep_id>/',DMS_department_put_api.as_view(),name='department_put'),
    path('department_delete/<int:dep_id>/',DMS_department_delete_api.as_view(),name='department_delete'),

    path('group_post/',DMS_Group_post_api.as_view(),name='group_post'),
    path('group_put/<int:grp_id>/',DMS_Group_put_api.as_view(),name='group_put'),
    path('group_delete/<int:grp_id>/',DMS_Group_delete_api.as_view(),name='group_delete'),

    path('employee_post/',DMS_Employee_post_api.as_view(),name='employee_post'),
    path('employee_put/<int:emp_id>/',DMS_Employee_put_api.as_view(),name='employee_put'),
    path('employee_delete/<int:emp_id>/',DMS_Employee_delete_api.as_view(),name='employee_delete'),


    

]