from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class DMS_department_post_api(APIView):
    def post(self,request):
        serializers=DMS_department_serializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST) 

class DMS_department_put_api(APIView):
    def get(self, request, dep_id):
        snippet = DMS_Department.objects.filter(dep_id=dep_id,dep_is_deleted=False)
        serializers = DMS_department_serializer(snippet, many=True)
        return Response(serializers.data)

    def put(self, request, dep_id):
        try:
            instance = DMS_Department.objects.get(dep_id=dep_id)
        except DMS_Department.DoesNotExist:
            return Response({"error": "Department not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DMS_department_serializer(instance, data=request.data, partial=True)  # partial=True allows partial updates

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DMS_department_delete_api(APIView):
    def get(self, request, dep_id):
        try:
            instance = DMS_Department.objects.get(dep_id=dep_id, dep_is_deleted=False)
        except DMS_Department.DoesNotExist:
            return Response({"error": "Department not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)
        serializer = DMS_department_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, dep_id):
        try:
            instance = DMS_Department.objects.get(dep_id=dep_id, dep_is_deleted=False)
        except DMS_Department.DoesNotExist:
            return Response({"error": "Department not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)

        instance.dep_is_deleted = True
        instance.save()
        return Response({"message": "Department soft deleted successfully."}, status=status.HTTP_200_OK)

class DMS_Group_post_api(APIView):
    def post(self,request):
        serializers=DMS_Group_serializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST) 

class DMS_Group_put_api(APIView):
    def get(self, request, grp_id):
        snippet = DMS_Group.objects.filter(grp_id=grp_id,grp_is_deleted=False)
        serializers = DMS_Group_serializer(snippet, many=True)
        return Response(serializers.data)

    def put(self, request, grp_id):
        try:
            instance = DMS_Group.objects.get(grp_id=grp_id)
        except DMS_Group.DoesNotExist:
            return Response({"error": "Group not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DMS_Group_serializer(instance, data=request.data, partial=True)  # partial=True allows partial updates

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DMS_Group_delete_api(APIView):
    def get(self, request, grp_id):
        try:
            instance = DMS_Group.objects.get(grp_id=grp_id, grp_is_deleted=False)
        except DMS_Group.DoesNotExist:
            return Response({"error": "Group not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)
        serializer = DMS_Group_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, grp_id):
        try:
            instance = DMS_Group.objects.get(grp_id=grp_id, grp_is_deleted=False)
        except DMS_Group.DoesNotExist:
            return Response({"error": "Group not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)

        instance.grp_is_deleted = True
        instance.save()
        return Response({"message": "Group soft deleted successfully."}, status=status.HTTP_200_OK)

class DMS_Employee_post_api(APIView):
    def post(self,request):
        serializers=DMS_Employee_serializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST) 

class DMS_Employee_put_api(APIView):
    def get(self, request, emp_id):
        snippet = DMS_Employee.objects.filter(emp_id=emp_id,emp_is_deleted=False)
        serializers = DMS_Employee_serializer(snippet, many=True)
        return Response(serializers.data)

    def put(self, request, emp_id):
        try:
            instance = DMS_Employee.objects.get(emp_id=emp_id)
        except DMS_Employee.DoesNotExist:
            return Response({"error": "Group not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DMS_Employee_serializer(instance, data=request.data, partial=True)  # partial=True allows partial updates

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DMS_Employee_delete_api(APIView):
    def get(self, request, emp_id):
        try:
            instance = DMS_Employee.objects.get(emp_id=emp_id, emp_is_deleted=False)
        except DMS_Employee.DoesNotExist:
            return Response({"error": "Employee not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)
        serializer = DMS_Employee_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, emp_id):
        try:
            instance = DMS_Employee.objects.get(emp_id=emp_id, emp_is_deleted=False)
        except DMS_Employee.DoesNotExist:
            return Response({"error": "Employee not found or already deleted."}, status=status.HTTP_404_NOT_FOUND)

        instance.emp_is_deleted = True
        instance.save()
        return Response({"message": "Employee soft deleted successfully."}, status=status.HTTP_200_OK)

 