package com.example.newsapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class HomeActivity extends AppCompatActivity {
    Button headline,aboutSources,byTopic,byCategory,byMultipleSources,aboutAPI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        
        headline=findViewById(R.id.headline);
        aboutSources=findViewById(R.id.aboutSources);
        byTopic=findViewById(R.id.byTopic);
        byCategory=findViewById(R.id.byCategory);
        byMultipleSources=findViewById(R.id.byMultipleSources);
        aboutAPI=findViewById(R.id.aboutAPI);

        headline.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
        aboutSources.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,NewsBySpecificSource.class);
                startActivity(intent);
            }
        });
        byTopic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,SearchByTopic.class);
                startActivity(intent);
            }
        });
        byCategory.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,SelectCategory.class);
                startActivity(intent);

            }
        });
        byMultipleSources.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,CheckBoxPage.class);
                startActivity(intent);
            }
        });
        aboutAPI.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(HomeActivity.this,About.class);
                startActivity(intent);
            }
        });
    }
}
