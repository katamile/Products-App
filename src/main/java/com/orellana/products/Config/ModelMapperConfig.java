package com.orellana.products.Config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.hibernate.Hibernate;
import org.hibernate.collection.spi.PersistentSet;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class ModelMapperConfig {

    @Bean
    ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setMatchingStrategy(MatchingStrategies.STANDARD);

        // Conversión explícita de Set a List en la configuración de ModelMapper
        modelMapper.addConverter(new AbstractConverter<Set<?>, List<?>>() {
            @Override
            protected List<?> convert(Set<?> source) {
                if (source instanceof PersistentSet) {
                    // Initialize the PersistentSet to ensure data is fetched
                    Hibernate.initialize(source);
                }
                // Convertir el Set (incluyendo PersistentSet) a una List
                return new ArrayList<>(source);
            }
        });

        return modelMapper;
    }
}


